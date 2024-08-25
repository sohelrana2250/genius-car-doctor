import { useEffect, useState } from "react";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/admin`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.isAdmin);
        setIsAdminLoading(false);
      });
  }, []);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
