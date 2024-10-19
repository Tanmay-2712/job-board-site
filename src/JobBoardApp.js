import React, { useState } from 'react';
import { User, Phone, Building2, Mail, Users, LogOut, PlusCircle } from 'lucide-react';
import { Card } from './ui/card'; // Changed to named import
import { Input } from './ui/input'; // Changed to named import
import { Button } from './ui/button'; // Changed to named import
import { CardHeader, CardTitle, CardContent } from './ui/card'; // Ensure this path is correct
// Main App Component
const JobBoardApp = () => {
  const [currentPage, setCurrentPage] = useState('signup');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);

    setCurrentPage('login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentPage === 'signup' && <SignUp onSignUpSuccess={() => setCurrentPage('login')} />}
      {currentPage === 'login' && <Login onLoginSuccess={handleLogin} />}
      {currentPage === 'dashboard' && <Dashboard user={user} onLogout={handleLogout} />}
      {currentPage === 'postJob' && <PostJob user={user} onJobPosted={() => setCurrentPage('dashboard')} />}
    </div>
  );
};

// SignUp Component
const SignUp = ({ onSignUpSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    companyEmail: '',
    employeeSize: '',
  });
  const [emailOTP, setEmailOTP] = useState('');
  const [mobileOTP, setMobileOTP] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProceed = () => {
    setStep(2);
  };

  const handleVerify = (type) => {
    if (type === 'email' && emailOTP) {
      // Verify email OTP
    } else if (type === 'mobile' && mobileOTP) {
      // Verify mobile OTP
    }
    // If both are verified, complete signup
    if (emailOTP && mobileOTP) {
      onSignUpSuccess();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); handleProceed(); }}>
              <div className="space-y-4">
                <Input
                  icon={<User className="text-gray-400" />}
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  icon={<Phone className="text-gray-400" />}
                  placeholder="Phone no."
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  icon={<Building2 className="text-gray-400" />}
                  placeholder="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  icon={<Mail className="text-gray-400" />}
                  placeholder="Company Email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  icon={<Users className="text-gray-400" />}
                  placeholder="Employee Size"
                  name="employeeSize"
                  value={formData.employeeSize}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                By clicking on proceed you will accept our Terms & Conditions
              </p>
              <Button className="w-full mt-6" type="submit">
                Proceed
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <Input
                  icon={<Mail className="text-gray-400" />}
                  placeholder="Email OTP"
                  value={emailOTP}
                  onChange={(e) => setEmailOTP(e.target.value)}
                />
                <Button className="w-full mt-2" onClick={() => handleVerify('email')}>
                  Verify Email
                </Button>
              </div>
              <div>
                <Input
                  icon={<Phone className="text-gray-400" />}
                  placeholder="Mobile OTP"
                  value={mobileOTP}
                  onChange={(e) => setMobileOTP(e.target.value)}
                />
                <Button className="w-full mt-2" onClick={() => handleVerify('mobile')}>
                  Verify Mobile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Login Component
const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement actual login logic here
    onLoginSuccess({ name: 'John Doe', email: email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                icon={<Mail className="text-gray-400" />}
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                icon={<User className="text-gray-400" />}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ user, onLogout }) => {
  const [jobs, setJobs] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/api/placeholder/40/40" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Cuvette</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span>Contact</span>
          <div className="flex items-center space-x-2">
            <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
            <span>{user.name}</span>
          </div>
          <Button onClick={onLogout} variant="ghost">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Job Postings</h2>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Job Posting
          </Button>
        </div>
        {jobs.length === 0 ? (
          <p>No job postings yet. Create your first job posting!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{job.description}</p>
                  <p className="mt-2">Experience: {job.experience}</p>
                  <p>End Date: {job.endDate}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// PostJob Component
const PostJob = ({ user, onJobPosted }) => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    experience: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement job posting logic here
    onJobPosted();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Job Posting</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                placeholder="Job Title"
                name="title"
                value={jobData.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Job Description"
                name="description"
                value={jobData.description}
                onChange={handleInputChange}
                required
                rows={4}
              />
              <Input
                placeholder="Experience Level"
                name="experience"
                value={jobData.experience}
                onChange={handleInputChange}
                required
              />
              <Input
                type="date"
                placeholder="End Date"
                name="endDate"
                value={jobData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Post Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobBoardApp;
