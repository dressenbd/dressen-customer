"use client";

import { useGetSettingsQuery } from "@/redux/featured/settings/settingsApi";
import { Lock, Eye, UserCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function PrivacyPolicyPage() {
  useScrollToTop();
  const { data: settings, isLoading } = useGetSettingsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading policy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Lock className="w-8 h-8 text-amber-800" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {settings?.privacyPolicy?.title || "Privacy Policy"}
              </h1>
              <p className="text-gray-600 mt-1">Your privacy matters to us</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Policy Content */}
          <div className="p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg mb-8">
                <div className="flex items-start space-x-3">
                  <UserCheck className="w-6 h-6 text-amber-800 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">Our Privacy Commitment</h3>
                    <p className="text-amber-800 leading-relaxed">
                      {settings?.privacyPolicy?.description || 
                       "We value your privacy. Your personal data will only be used to process your order and support your experience on our site."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Privacy Sections */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="w-6 h-6 text-amber-700" />
                    <h3 className="text-xl font-semibold text-gray-900">Data Security</h3>
                  </div>
                  <p className="text-gray-700">Your personal information is encrypted and securely stored using industry standards.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-6 h-6 text-amber-700" />
                    <h3 className="text-xl font-semibold text-gray-900">Data Usage</h3>
                  </div>
                  <p className="text-gray-700">We only collect necessary information to provide you with the best shopping experience.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 lg:px-12 py-6 border-t">
            <p className="text-sm text-gray-600 text-center">
              Last updated: {new Date().toLocaleDateString()} • 
              <Link href="/contact-us" className="text-amber-800 hover:text-amber-900 ml-1">
                Contact us for questions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}