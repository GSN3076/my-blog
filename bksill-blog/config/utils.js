import { API_URL } from "./config";

export const checkProductInWishList = (wishlistArr, productId) => {
    return wishlistArr.find((item) => item.id === productId);
  };


export const fileUpload = async (userToken,file) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}` );

    var formdata = new FormData();
    formdata.append("files", file, file.name);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    };

    const res = await fetch(`${API_URL}/upload`, requestOptions)
    const response = res.json()
    return response
}