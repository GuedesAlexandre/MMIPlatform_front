import Cookies from "js-cookie";
import axios from "axios";

export const getResourceMatrix = async (
  promo: string,
  semester: string,
  ueName: string,
  resourceName: string
) => {
  try {
    const bearer = Cookies.get("bearer");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/export/modules?promo=${promo}&semester=${semester}&ueName=${ueName}&moduleName=${resourceName}`,
      {
        headers: {
          Authorization: `Bearer ${bearer?.toString()}`,
        },
        responseType: "blob",
      }
    );

    if (!response) {
      throw new Error(`Failed to export resource ${resourceName}`);
    }

    const url = window.URL.createObjectURL(response.data);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const date = `${dd}-${mm}-${yyyy}`;

    const contentDisposition = response.headers["content-disposition"];
    const fileNameMatch = contentDisposition?.match(/filename="?(.+)"?/);
    const fileName = fileNameMatch ? fileNameMatch[1] : `${promo}-semestre_${semester}-${resourceName}-${date}.xlsx`;

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
