import { apiClient } from "@/configs/apis";
import { useMutation } from "@tanstack/react-query";

type CertificateUploadArgs = {
  certificate: string;
};

type CertificateUploadResponse = {
  success: boolean;
  message?: string;
};

export const useCertificateUpload = () => {
  return useMutation({
    mutationKey: ["certificate:upload"],
    mutationFn: async (
      uploadData: CertificateUploadArgs,
    ): Promise<CertificateUploadResponse> => {
      const base64Data =
        uploadData.certificate.split(",")[1] || uploadData.certificate;

      const response = await apiClient.post("/certificate/upload", {
        certificate: base64Data,
      });
      return response.data;
    },
  });
};
