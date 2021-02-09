import React from "react";
import { AppointmentModel } from "../../cc/AppointmentHelpers";
import { ApiError } from "../../util/ApiClient";
import { useApiClient, useEffect, useLoadingReducer, useState } from "../../util/CustomReactHooks";
import { formatDate, parseDate, withErrorHandling } from "../../util/helper";
import { NotificationContainer, NotificationManager } from "react-notifications";

const Home = () => {
	const [loading, dispatchLoading] = useLoadingReducer();
	const apiClient = useApiClient();
	const [accessDenied, setAccessDenied] = useState<boolean>(false);
	const [qAppointments, setQAppointments] = useState<AppointmentModel[]>([]);

	useEffect(() => {
		withErrorHandling(
			async () => {
				const today = new Date();
				const result = await apiClient.post(`/api/appointments.php`, {
					fromDate: formatDate(today),
					toDate: formatDate(today),
				});
				setQAppointments(
					result.resp.appointments.map((appt) => ({
						...appt,
						day: formatDate(parseDate(appt.day)),
						timeSlotStr: appt.timeSlot,
					}))
				);
			},
			(error) => {
				if (error instanceof ApiError && error.status === 403) {
					setAccessDenied(true);
				} else {
					NotificationManager.error(error.message);
				}
			},
			() => dispatchLoading("dec")
		);
	}, []);

	if (loading.count > 0) {
		return <div className="pt-12">Kérem várjon míg lekérdezzük az foglaltságot...</div>;
	} else if (accessDenied) {
		return <h1 className="pt-12 text-4xl leading-tight font-semibold text-center">Hozzáférés megtagadva</h1>;
	} else {
		return (
			<div className="container p-4">
				<h1 className="mb-4 text-2xl font-semibold text-center">Mai foglalások ({formatDate(new Date())})</h1>
				{qAppointments.map((appt) => (
					<div className="mb-8">
						<div>Név: {appt.name}</div>
						<div>
							Szolgáltatás: {appt.serviceType === "MotTest" ? "Műszaki vizsga" : "Eredetiség vizsgálat"}
						</div>
						<div>Telefonszám: {appt.phone}</div>
						<div>Email: {appt.email}</div>
						<div>Autó típus: {appt.autoType}</div>
						<div>Rendszám: {appt.regNumber}</div>
						<div>Megjegyzés: {appt.remark}</div>
					</div>
				))}
				<NotificationContainer />
			</div>
		);
	}
};

export default Home;
