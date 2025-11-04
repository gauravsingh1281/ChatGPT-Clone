import { useSelector } from "react-redux";
import { Link } from "react-router";

const Home = () => {
    const { user } = useSelector((state) => state.auth);

    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Lightning Fast",
            description: "Get instant responses powered by advanced AI technology"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Secure & Private",
            description: "Your conversations are encrypted and never shared"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
            ),
            title: "Natural Conversations",
            description: "Chat naturally with context-aware AI assistant"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            title: "Multimodal Support",
            description: "Work with text, code, and more with ease"
        }
    ];

    const examples = [
        "Explain quantum computing in simple terms",
        "Write a Python function to sort an array",
        "Help me plan a trip to Japan",
        "Debug my JavaScript code"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Navigation */}
            <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">AI Assistant</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Contact
                            </Link>
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {user.fullName?.firstName} {user.fullName?.lastName}
                                    </span>
                                    <Link
                                        to="/chat"
                                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Go to Chat
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        Your AI Assistant
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mt-2">
                            Always Ready to Help
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                        Experience the power of advanced AI. Get instant answers, creative ideas, and expert assistance on any topic.
                    </p>
                    <div className="flex gap-4 justify-center">
                        {!user && (
                            <>
                                <Link
                                    to="/register"
                                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
                                >
                                    Start Chatting Free
                                </Link>
                                <Link
                                    to="/about"
                                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-lg"
                                >
                                    Learn More
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Example Prompts */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        Try asking about...
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {examples.map((example, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all cursor-pointer group shadow-sm hover:shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300">{example}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                        Why Choose Our AI Assistant?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all shadow-lg hover:shadow-xl"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                {!user && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-12 text-center shadow-2xl">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join thousands of users already chatting with our AI assistant
                        </p>
                        <Link
                            to="/register"
                            className="inline-block px-8 py-4 bg-white text-amber-600 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
                        >
                            Create Free Account
                        </Link>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <p>&copy; 2025 AI Assistant. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home;