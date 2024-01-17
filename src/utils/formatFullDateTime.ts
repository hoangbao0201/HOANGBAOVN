const formatFullDateTime = (isoString: Date) => {
    const date = new Date(isoString);

    const dayOfWeek = [
        "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
    ][date.getUTCDay()];

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formattedDateTime = `${dayOfWeek}, ${day}/${month}/${year}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} (GMT)`;

    return formattedDateTime;
}

export default formatFullDateTime;