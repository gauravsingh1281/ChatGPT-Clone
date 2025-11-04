import { Link } from "react-router";

const About = () => {
    const stats = [
        { label: "Active Users", value: "10K+" },
        { label: "Messages Sent", value: "1M+" },
        { label: "Languages", value: "50+" },
        { label: "Uptime", value: "99.9%" }
    ];

    const values = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: "Innovation First",
            description: "We leverage cutting-edge AI technology to provide the best conversational experience possible."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: "User-Centric",
            description: "Every feature is designed with you in mind, ensuring an intuitive and delightful experience."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Privacy & Security",
            description: "Your data is encrypted and protected with industry-leading security standards."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Navigation */}
            <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">AI Assistant</span>
                        </Link>
                        <div className="flex items-center gap-6">
                            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Home
                            </Link>
                            <Link to="/about" className="text-amber-600 dark:text-amber-400 font-semibold">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        About Our
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mt-2">
                            AI Assistant
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        We're on a mission to make advanced AI accessible to everyone, enabling seamless conversations and intelligent assistance.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-700 mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        <p>
                            Founded in 2024, AI Assistant was born from a simple idea: everyone deserves access to powerful AI technology that understands and assists them naturally.
                        </p>
                        <p>
                            We believe that AI should be intuitive, helpful, and available to anyone, anywhere. That's why we've built a platform that combines state-of-the-art language models with a beautiful, easy-to-use interface.
                        </p>
                        <p>
                            Today, we serve thousands of users worldwide, helping them with everything from creative writing to coding, research, and everyday questions. Our journey has just begun, and we're committed to continuously improving and innovating.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-12 text-center shadow-2xl">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Join Our Journey
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        We're constantly evolving and improving. Be part of the AI revolution and experience the future of conversations.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block px-8 py-4 bg-white text-amber-600 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
                    >
                        Get Started Today
                    </Link>
                </div>
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

export default About