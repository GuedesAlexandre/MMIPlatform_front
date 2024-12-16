export const exportMatrixByPromo = (semester: string) => {
    const promo = getpromo(semester);
    window.open(
      `${process.env.NEXT_PUBLIC_API_PATH}/export/students?promo=${promo}&semester=${semester}`
    );
  };
  
  const getpromo = (semester: string) => {
    switch (semester) {
      case "1":
        return "MMI01";
      case "2":
        return "MMI01";
      case "3":
        return "MMI02";
      case "4":
        return "MMI02";
      case "5":
        return "MMI03";
      case "6":
        return "MMI03";
      default:
        return "";
    }
  };