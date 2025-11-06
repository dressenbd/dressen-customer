"use client";

import { useGetSettingsQuery } from "@/redux/featured/settings/settingsApi";
import { Shield, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function ReturnPolicyPage() {
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
              <Shield className="w-8 h-8 text-amber-800" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {settings?.returnPolicy?.title || "Return & Refund Policy"}
              </h1>
              <p className="text-gray-600 mt-1">Your satisfaction is our priority</p>
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
                  <CheckCircle className="w-6 h-6 text-amber-800 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">Our Commitment</h3>
                    <p className="text-amber-800 leading-relaxed">
                      {settings?.returnPolicy?.description || 
                       "You can return most new, unopened items within 7 days of delivery for a full refund. Please retain your receipt for verification."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Policy Sections */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-amber-700" />
                    <h3 className="text-xl font-semibold text-gray-900">Return Window</h3>
                  </div>
                  <p className="text-gray-700">Items must be returned within 7 days of delivery in original condition.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-amber-700" />
                    <h3 className="text-xl font-semibold text-gray-900">Refund Process</h3>
                  </div>
                  <p className="text-gray-700">Full refunds processed within 3-5 business days after item inspection.</p>
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