import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const updatePassword = async () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated successfully");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h1>

        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button
          onClick={updatePassword}
          disabled={loading}
          className="w-full mt-5 rounded-full bg-rose-600"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
}