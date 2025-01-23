import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to Your Dashboard</h1>
        <p className="text-sm text-gray-600">Here's an overview of your activity</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-medium mb-2">Quick Stats</h3>
          <p className="text-sm text-gray-600">View your chat history and activity</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-2">Recent Conversations</h3>
          <p className="text-sm text-gray-600">Continue where you left off</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-2">Subscription Status</h3>
          <p className="text-sm text-gray-600">Manage your subscription</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;