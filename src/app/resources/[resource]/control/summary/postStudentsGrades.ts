import Cookies from "js-cookie";
import axios from "axios";

export const postStudentGrade = async (
  data: { coeff: number; note: number; name: string; status: string },
  numEtu: string,
  resource: string
) => {
  try {
    const bearer = Cookies.get("bearer");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/student/notes/${numEtu}/${resource}`,
      {
        coeff: data.coeff,
        note: data.note,
        name: data.name,
        status: data.status,
        headers: {
          Authorization: `Bearer ${bearer?.toString()}`,
        },
      }
    );

    if (!response) {
      throw new Error(`Failed to post note for ${numEtu}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
