import React from 'react'

const SignupSidebar = () => {
  return (
    <div className="w-1/4 bg-blue-900 text-white p-12 flex flex-col justify-center">
          <div className="text-2xl font-bold mb-4">Montage</div>
          <h2 className="text-3xl font-semibold mb-2">Get started for free</h2>
          <p className="text-gray-300 mb-6">Only pay for what you need</p>

          {/* Features List */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-lg">✔</span>
              <div>
                <h3 className="font-semibold">Get started fast</h3>
                <p className="text-gray-300 text-sm">
                  Start for free. Designing with Montage Studio is always free,
                  so you can sign up and get started without friction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-lg">✔</span>
              <div>
                <h3 className="font-semibold">Access free design tools</h3>
                <p className="text-gray-300 text-sm">
                  Use our design tools to create the perfect design for your
                  next home or ADU project!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-lg">✔</span>
              <div>
                <h3 className="font-semibold">Trusted by industry leaders</h3>
                <p className="text-gray-300 text-sm">
                  Join our growing network of registered architects designing
                  and developing projects with Montage Studio.
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SignupSidebar