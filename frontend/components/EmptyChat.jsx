export default function EmptyChat() {
    return (
        <div className="flex flex-col justify-center items-center h-full text-white">
            <img
                src='logo.png'
                alt="devConnect_Logo"
                className="w-24 h-24 opacity-60 rounded-full"
            />
            <h2 className="text-2xl font-semibold mt-4">Welcome to devConnect</h2>
            <p className="text-sm text-gray-400 mt-2 text-center w-[60%]">
                Select a conversation to start messaging.
            </p>
        </div>
    );
}