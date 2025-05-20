// lab3/utils/InitServices.js
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const dichVuMau = [
  {
    ten: "Chăm sóc da mặt và dưỡng ẩm tự nhiên",
    gia: 250000,
    nguoiTao: "Hung",
    thoiGianTao: Timestamp.fromDate(new Date()),
    capNhatLanCuoi: Timestamp.fromDate(new Date()),
  },
  {
    ten: "Gội đầu dưỡng sinh trung hoa",
    gia: 150000,
    nguoiTao: "Hung",
    thoiGianTao: Timestamp.fromDate(new Date()),
    capNhatLanCuoi: Timestamp.fromDate(new Date()),
  },
  {
    ten: "Lột mụn",
    gia: 40000,
    nguoiTao: "Hung",
    thoiGianTao: Timestamp.fromDate(new Date()),
    capNhatLanCuoi: Timestamp.fromDate(new Date()),
  },
  {
    ten: "Gội đầu dưỡng sinh trọn gói tất cả dịch vụ",
    gia: 400000,
    nguoiTao: "Hung",
    thoiGianTao: Timestamp.fromDate(new Date()),
    capNhatLanCuoi: Timestamp.fromDate(new Date()),
  },
  {
    ten: "Dịch vụ rửa mặt",
    gia: 100000,
    nguoiTao: "Hung",
    thoiGianTao: Timestamp.fromDate(new Date()),
    capNhatLanCuoi: Timestamp.fromDate(new Date()),
  },
  {
    ten: "Dịch vụ đánh răng",
    gia: 50000,
    nguoiTao: "Hung",
    thoiGianTao: Timestamp.fromDate(new Date()),
    capNhatLanCuoi: Timestamp.fromDate(new Date()),
  },
];

export const taoDuLieuMau = async () => {
  const querySnapshot = await getDocs(collection(db, 'services'));

  if (querySnapshot.empty) {
    for (let dv of dichVuMau) {
      await addDoc(collection(db, 'services'), dv);
    }
  }
};
