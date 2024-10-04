"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Mail,
  Lock,
  User,
  Briefcase,
  MapPin,
  Calendar,
  Camera,
} from "lucide-react";
import YourProfile from "./your-profile";
import CustomAlert from "./custom-alert";
import WhatsappButton from "./whatsapp-button";

interface UserProfileProps {
  email: string;
}

export default function UserProfile({ email }: { email: string }) {
  // console.log(email);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "I'm a software developer passionate about creating user-friendly applications.",
    avatar: "/placeholder.svg?height=200&width=200",
    location: "San Francisco, CA",
    occupation: "Software Engineer",
    birthdate: "1990-01-01",
    notifications: {
      email: true,
      push: false,
    },
    theme: "system",
  });

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({ ...prevUser, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Updated user data:", user);
  //   // Here you would typically send the updated user data to your backend
  // };

  // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setUser((prevUser) => ({
  //         ...prevUser,
  //         avatar: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleNotificationChange = (type: "email" | "push") => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     notifications: {
  //       ...prevUser.notifications,
  //       [type]: !prevUser.notifications[type],
  //     },
  //   }));
  // };

  // const handleThemeChange = (theme: string) => {
  //   setUser((prevUser) => ({ ...prevUser, theme }));
  //   // Here you would typically update the theme in your app
  // };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-r from-black to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg bg-white">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Your Profile
            </CardTitle>
            <CardDescription className="text-gray-500">
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                {/* <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger> */}
                <TabsTrigger value="Whatsapp">WhatsAPP Group</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <YourProfile email={email} />
              </TabsContent>
              <TabsContent value="Whatsapp">
                <WhatsappButton />
              </TabsContent>
              {/* <TabsContent value="preferences"> */}
              {/* <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={user.notifications.email}
                        onCheckedChange={() =>
                          handleNotificationChange("email")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive push notifications on your devices
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={user.notifications.push}
                        onCheckedChange={() => handleNotificationChange("push")}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Appearance</h3>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={user.theme}
                        onValueChange={handleThemeChange}
                      >
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div> */}
              {/* <CustomAlert />
              </TabsContent> */}
              {/* <TabsContent value="security"> */}
              {/* <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <Button className="w-full" variant="outline">
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Two-Factor Authentication
                    </h3>
                    <Button className="w-full" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessions</h3>
                    <Button className="w-full" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Manage Active Sessions
                    </Button>
                  </div>
                </div> */}
              {/* <CustomAlert />
              </TabsContent> */}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
