// lab3/utils/InitServices.js
import { collection, getDocs, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { query, where } from 'firebase/firestore';

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

export const taoDuLieuMau = async () =>
{
  const querySnapshot = await getDocs(collection(db, 'services'));

  if (querySnapshot.empty)
  {
    for (let dv of dichVuMau)
    {
      await addDoc(collection(db, 'services'), dv);
    }
  }
};

export const setAdminAccount = async () =>
{
  try
  {
    // Tìm user với số điện thoại 0337612621
    const q = query(collection(db, 'users'), where('phone', '==', '0337612621'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty)
    {
      const userDoc = snapshot.docs[0];
      // Cập nhật role thành admin
      await updateDoc(doc(db, 'users', userDoc.id), {
        role: 'admin'
      });
      console.log('Đã cập nhật tài khoản thành admin thành công');
    } else
    {
      console.log('Không tìm thấy tài khoản');
    }
  } catch (error)
  {
    console.error('Lỗi khi cập nhật tài khoản:', error);
  }
};
