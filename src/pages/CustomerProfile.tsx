import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function CustomerProfile() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    skills: '',
    interests: [],
    experience: '',
    location: ''
  });
  
  const [showSummary, setShowSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState('');

  const artInterests = [
    'Pottery', 'Textiles', 'Woodwork', 'Jewelry', 'Paintings', 
    'Sculptures', 'Metalwork', 'Ceramics', 'Weaving', 'Embroidery'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter(i => i !== interest)
        : [...formData.interests, interest]
    });
  };

  const generateAISummary = () => {
    // Simulate AI generation
    const summary = `Based on your profile, you are a ${formData.age}-year-old art enthusiast named ${formData.name} with skills in ${formData.skills}. Your interests in ${formData.interests.join(', ')} suggest you have a deep appreciation for traditional crafts. With ${formData.experience} experience, you would particularly enjoy exploring handcrafted pieces that showcase authentic techniques and cultural heritage. We recommend connecting with artisans who specialize in ${formData.interests.slice(0, 2).join(' and ')} to discover unique pieces that align with your artistic sensibilities.`;
    
    setAiSummary(summary);
    setShowSummary(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateAISummary();
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 mb-4">
              Your Art Profile
            </h1>
            <p className="text-xl text-gray-600">
              Tell us about yourself to get personalized art recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="group">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                    Age *
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    required
                    min="13"
                    max="120"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md"
                    placeholder="Enter your age"
                  />
                </div>

                <div className="group">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md"
                    placeholder="City, Country"
                  />
                </div>

                <div className="group">
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                    Your Skills & Talents *
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    required
                    rows={3}
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md resize-none"
                    placeholder="Describe your artistic skills, hobbies, or talents..."
                  />
                </div>

                <div className="group">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                    Art Experience Level
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md"
                  >
                    <option value="">Select your experience level</option>
                    <option value="Beginner">Beginner - Just starting to explore art</option>
                    <option value="Intermediate">Intermediate - Some experience with art</option>
                    <option value="Advanced">Advanced - Experienced art enthusiast</option>
                    <option value="Professional">Professional - Working in creative field</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Art Interests (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {artInterests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                          formData.interests.includes(interest)
                            ? 'border-amber-500 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 shadow-lg'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl duration-300"
                >
                  Generate AI Profile Summary
                </button>
              </form>
            </div>

            {/* AI Summary Display */}
            <div className="space-y-6">
              <div className={`bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 rounded-2xl p-8 shadow-xl transition-all duration-500 transform ${showSummary ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">AI Profile Summary</h3>
                </div>
                
                {showSummary ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
                    <div className="flex space-x-4 pt-4">
                      <Link 
                        to="/products"
                        className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl duration-300"
                      >
                        Explore Recommended Art
                      </Link>
                      <button className="border-2 border-amber-600 text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-all transform hover:scale-105 duration-300">
                        Save Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600">Fill out your profile to get personalized art recommendations powered by AI</p>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800">Favorites</h4>
                    <p className="text-2xl font-bold text-blue-600">0</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800">Viewed</h4>
                    <p className="text-2xl font-bold text-green-600">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="text-amber-600 hover:text-amber-700 font-medium transition-colors hover:underline">
              Skip for now and browse artworks →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CustomerProfile;