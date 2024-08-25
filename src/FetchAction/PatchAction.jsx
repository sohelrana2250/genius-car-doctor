import toast from "react-hot-toast";

const PatchAction = (url, selectedSpecialties, refetch) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },

    body: JSON.stringify(selectedSpecialties),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("API ERROR");
      }
      return res.json();
    })
    .then((data) => {
      toast.success(data?.message);
      refetch();
    })
    .catch((error) => {
      toast.error(error?.message);
    });
};

export default PatchAction;
