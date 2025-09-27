import { createApiUrl } from "@/configs/api";
import { PersonalInfoState } from "@/types/signup"; // 필요한 타입 import
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import imageCompression from "browser-image-compression";

// dataURL(base64)을 File 객체로 변환하는 헬퍼 함수
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid dataURL format");
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  // 👇 UintArray -> Uint8Array 로 오타 수정
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// 👇 훅이 받아야 할 모든 정보를 타입으로 정의합니다.
type UploadArgs = {
  signUpKey: string;
  imageDataUrl: string;
  personalInfo: PersonalInfoState;
  experienceCategories: string[];
  equipmentTypes?: string[];
  bankName: string;
  accountNumber: string;
};

export const useCertificateUpload = () => {
  return useMutation({
    mutationKey: ["auth:uploadCertificate"],
    mutationFn: async ({
      signUpKey,
      imageDataUrl,
      personalInfo,
      experienceCategories,
      equipmentTypes = [],
      bankName,
      accountNumber,
    }: UploadArgs) => {
      console.log("이수증 업로드 시작 - signUpKey:", signUpKey);

      const originalFile = dataURLtoFile(imageDataUrl, "certificate.jpg");
      console.log("원본 파일:", originalFile.name, originalFile.size, "bytes");

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(originalFile, options);
      console.log(
        "압축된 파일:",
        compressedFile.name,
        compressedFile.size,
        "bytes",
      );

      // 백엔드 컨트롤러에 맞춰 @RequestPart로 전송
      console.log("@RequestPart 방식으로 multipart/form-data 전송");

      const formData = new FormData();

      // payload는 JSON 객체를 @RequestPart로 받으므로 Blob으로 감싸서 전송
      const payload = {
        name: personalInfo.name,
        phoneNumber: personalInfo.phoneNumber.replace(/[^0-9]/g, ""), // 하이픈 제거
        birthDate: `${personalInfo.birthDate.slice(0, 4)}-${personalInfo.birthDate.slice(4, 6)}-${personalInfo.birthDate.slice(6, 8)}`,
        experienceCategories,
        equipmentTypes,
        bankName,
        AccountNumber: accountNumber, // 백엔드 DTO에 맞춰 대문자 A로 수정
      };

      console.log("전송할 payload:", payload);
      console.log("signUpKey:", signUpKey);

      // @RequestPart("payload")를 위해 JSON을 Blob으로 감싸서 전송
      const payloadBlob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      formData.append("payload", payloadBlob);

      // @RequestPart("certificate")를 위해 파일 전송 (required = false이므로 선택적)
      formData.append("certificate", compressedFile, "certificate.jpg");

      const response = await axios.post(
        createApiUrl("/auth/sign-up/worker-form"),
        formData,
        {
          headers: {
            signUpKey: signUpKey,
          },
        },
      );

      console.log("업로드 성공:", response.data);
      return response.data;
    },
  });
};
