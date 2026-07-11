import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const Footer = () => {
  return (
    <section className="w-full overflow-hidden py-8 md:py-5 bg-white/10 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -mx-2 md:-mx-6">
          <div className="w-full p-2 md:w-1/2 lg:w-5/12">
            <div className="flex md:px-2 px-0 h-full flex-col items-center md:items-start justify-between text-center md:text-left gap-3 md:gap-0">
              <div className="mb-1 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 sm:w-1/2 md:p-6 p-2 lg:w-2/12 text-center md:text-left">
            <div className="h-full">
              <h3 className="tracking-px mb-2 text-xs font-semibold uppercase text-gray-200">
                Company
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Features
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 sm:w-1/2 md:p-6 p-2 lg:w-2/12 text-center md:text-left">
            <div className="h-full">
              <h3 className="tracking-px mb-2 text-xs font-semibold uppercase text-gray-200">
                Support
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Account
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Help
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:p-6 p-2 lg:w-3/12 text-center md:text-left mt-4 sm:mt-0">
            <div className="h-full">
              <h3 className="tracking-px mb-2 text-xs font-semibold uppercase text-gray-200">
                Legals
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium text-gray-500 hover:text-blue-600" to="#">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer