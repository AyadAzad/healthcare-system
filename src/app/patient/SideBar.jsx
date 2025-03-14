import {useRouter, useSearchParams} from "next/navigation";

const SideBar = () =>{
    const searchParams = useSearchParams()
    const firstName = searchParams.get("firstName");
    const patientId = searchParams.get("patientId");
    const router = useRouter()
    const handleLogout = () => {
        router.push("/patient-login");
    };
    return (
        <div className="w-64 bg-blue-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">HealthCareIQ</h2>
            <nav>
                <a href={`/patient?firstName=${firstName}&patientId=${patientId}`}
                   className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                    Dashboard
                </a>
                <a href={`/patient/appointments?firstName=${firstName}&patientId=${patientId}`}
                   className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                    Appointments
                </a>
                <a href={`/patient/video-calls?firstName=${firstName}&patientId=${patientId}`}
                   className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                    Video Calls
                </a>
                <a href={`/patient/quick-advice?firstName=${firstName}&patientId=${patientId}`}
                   className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                    Quick Advice
                </a>
                <a href={`/patient/records?firstName=${firstName}&patientId=${patientId}`}
                   className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                    Medical Records
                </a>
                <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                    Settings
                </a>
                <button
                    onClick={() => {
                        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                        router.push("/login");
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                    Logout
                </button>
            </nav>
        </div>
    )
}
export default SideBar