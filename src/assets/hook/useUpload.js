import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";


// const storage = getStorage();
const uploadFile = async (file) => {
  const storageRef = ref(storage, file.name);
  const response = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(response.ref);
  
  console.log(downloadURL);
  return downloadURL;
};

export default uploadFile;