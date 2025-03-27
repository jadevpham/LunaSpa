import React from "react";
import { useTranslation } from "react-i18next";
const BookingHistory = () => {
	const { t } = useTranslation();
	return <div>{t("BookingHistory")}</div>;
};

export default BookingHistory;
