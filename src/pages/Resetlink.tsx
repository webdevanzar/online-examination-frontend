

const ResetPassword = () => {
  return (
    <div className="w-full min-h-screen bg-[#EAFCEF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img
            src="/src/assets/exhu.png"  
            alt="ExamHub Logo"
            className="h-14"
          />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Reset Your Password
          </h2>
          
          <p className="text-gray-600 mb-6 text-center">
            Enter your new password below.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors mt-4"
              type="button"
            >
              Reset Password
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;