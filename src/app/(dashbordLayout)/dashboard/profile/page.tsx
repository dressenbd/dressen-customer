"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";
import { useUpdateUserMutation } from "@/redux/featured/user/userApi";
import CloudinaryUploader from "@/components/CloudinaryUploader/CloudinaryUploader";
import { useSession } from "next-auth/react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  bio: string;
  notifications: boolean;
  image?: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    bio: "",
    notifications: true,
    image: "",
  });

  // Populate initial data
  useEffect(() => {
    if (session?.user) {
      const nameParts = session.user.name?.split(" ") || ["", ""];

      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: session.user.email || "",
        contactNo: "",
        bio: "", 
        notifications: true,
        image: session.user.image || "",
      });
    }
  }, [session]);

  const handleInputChange = (field: keyof FormData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;
    
    const updatedUser = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      contactNo: formData.contactNo,
      bio: formData.bio,
      image: formData.image
    };

    try {
      await updateUser({ 
        id: session.user.id, 
        userData: updatedUser 
      }).unwrap();
      
      toast.success("Profile updated successfully ✅", {
        duration: 3000,
        position: "top-right",
      });
    } catch {
      toast.error("Profile update failed ❌", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  // Show loading state while session is loading
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>;
  }


  return (
    <div className="min-h-screen bg-white shadow-sm ml-4 rounded-lg px-4 py-8 md:px-8">
      <Toaster />

      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10">
          My Account
        </h1>

        <div className="flex gap-8">
          <div className="flex-1">
            <Card className="bg-white shadow-sm border rounded-lg w-full md:w-[822px] min-h-[682px]">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-8">
                  Profile Information
                </h2>

                <div className="space-y-8">
                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Email + Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Contact No
                      </label>
                      <Input
                        type="tel"
                        value={formData.contactNo}
                        onChange={(e) =>
                          handleInputChange("contactNo", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="w-full min-h-[120px] resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-medium mb-4">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={formData.image || "/placeholder.svg?height=64&width=64"}
                        />
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-lg">
                          {formData.firstName[0]}
                          {formData.lastName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <CloudinaryUploader
                          onUpload={(url) =>
                            setFormData((prev) => ({ ...prev, image: url }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="notifications"
                      checked={formData.notifications}
                      onCheckedChange={(checked) =>
                        handleInputChange("notifications", checked as boolean)
                      }
                    />
                    <label
                      htmlFor="notifications"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Receive email notifications about new products and
                      promotions
                    </label>
                  </div>

                  {/* Save Button */}
                  <div className="pt-6">
                    <Button
                      onClick={handleSave}
                      className="bg-orange-500 hover:bg-orange-600 text-[#2e2e2e] px-8 py-3 rounded-lg"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}