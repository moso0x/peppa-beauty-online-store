import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { Separator } from "@/components/ui/separator";
import lock from "@/assets/lock.jpg";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/");
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else toast.error(error.message);
      } else {
        toast.success("Successfully logged in!");
        
        // Check if user has admin role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user?.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        if (roleData) {
          navigate("/admin");
        } else {
          navigate("/checkout");
        }
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupEmail || !signupPassword || !signupFullName) {
      toast.error("Please fill in all fields");
      return;
    }

    if (signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: { full_name: signupFullName },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered");
        } else toast.error(error.message);
      } else {
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
  const email = (resetEmail || loginEmail).trim();

  if (!email) {
    toast.error("Enter your email first");
    return;
  }

  setResetLoading(true);

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent to your email ✨");
    }
  } catch {
    toast.error("Unable to send reset email");
  } finally {
    setResetLoading(false);
  }
};
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg bg-white rounded-2xl">
          <CardHeader>
            
            <CardTitle className="text-2xl text-center text-black font-bold">
              Welcome
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-full py-2 flex items-center justify-center gap-2"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    {googleLoading ? "Connecting..." : "Continue with Google"}
                  </Button>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white rounded-full p-1">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-black rounded-full transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-[#00D45A] data-[state=active]:text-white rounded-full transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* LOGIN TAB */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                 <Input
                        id="login-email"
                        type="email"
                        placeholder="your email"
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(e.target.value);
                          setResetEmail(e.target.value);
                        }}
                        disabled={loading}
                        required
                      />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="your current password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        disabled={resetLoading}
                        className="text-sm text-rose-600 hover:text-rose-700 hover:underline"
                      >
                        {resetLoading ? "Sending reset..." : "Forgot Password?"}
                      </button>
                    </div>

                  {/* Solid Blue Button */}
                  <Button
                    type="submit"
                    className="w-full bg-pink-50 hover:bg-pink-100 text-black font-semibold 
                               shadow-md hover:shadow-lg transition-all duration-300 rounded-full py-2"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>

                 
                </form>
              </TabsContent>

              {/* SIGNUP TAB */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your Name"
                      value={signupFullName}
                      onChange={(e) => setSignupFullName(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Enter Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      disabled={loading}
                      required
                      minLength={6}
                    />
                  </div>

                  {/* Solid Green Button */}
                  <Button
                    type="submit"
                    className="w-full bg-pink hover:bg-pink-50 text-black font-semibold 
                               shadow-md hover:shadow-lg transition-all duration-300 rounded-full py-2"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>

                  

                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <FooterNew />
    </div>
  );
};

export default Auth;
