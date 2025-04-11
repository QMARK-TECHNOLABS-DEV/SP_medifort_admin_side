import { ClipboardX, FileX, AlertCircle } from "lucide-react"

const NoData = ({ text, icon = "clipboard" }) => {

    const icons = {
        clipboard: <ClipboardX className="h-16 w-16 text-primaryColor" />,
        file: <FileX className="h-16 w-16 text-primaryColor" />,
        alert: <AlertCircle className="h-16 w-16 text-primaryColor" />,
    }
    return (
        <div className={"flex justify-center p-4 w-full h-screen"}>
            <div className="bg-primaryColor/10 border border-primaryColor rounded-xl w-full mt-10 md:mt-20 h-fit max-w-3xl p-8 flex flex-col items-center justify-center gap-4 shadow-sm">
                <div className="bg-white rounded-full p-4 shadow-sm">{icons[icon]}</div>

                <h3 className="text-xl font-semibold text-gray-800text-center">{text}</h3>

                <p className="text-gray-500 text-center max-w-md">
                    The requested information is currently unavailable. Please check back later or try a different search.
                </p>
            </div>
        </div>
    )
}

export default NoData
