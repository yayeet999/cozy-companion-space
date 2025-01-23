import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-600 mt-2">Manage your preferences and account settings</p>
      </div>
      
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">Account Settings</CardTitle>
          <CardDescription>
            This section will allow you to manage your account preferences (Coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            We're working on bringing you more control over your account settings. Check back soon for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;