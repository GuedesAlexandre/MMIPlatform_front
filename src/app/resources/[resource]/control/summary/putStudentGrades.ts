import Cookies from "js-cookie";
import axios from "axios";

export const putStudentGrade = async (
  data: { coeff: number; note: number; name: string; status: string },
  numEtu: string,
  resource: string,
  lastname: string | null
) => {
  try {
    const bearer = Cookies.get("bearer");
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_PATH}/student/notes/${numEtu}/${resource}/${lastname}`,
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
