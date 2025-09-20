import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CommentSection from '../components/CommentSection';

function CreatePost() {
  const [activeTab, setActiveTab] = useState('product');
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    price: '',
    images: [] as File[],
    contentType: 'post',
    title: '',
    content: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const categories = ['Pottery', 'Textiles', 'Woodwork', 'Jewelry', 'Paintings', 'Sculptures', 'Metalwork', 'Ceramics'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...files]
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...files]
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const generateContent = (type: string) => {
    // Simulate AI content generation
    const templates = {
      post: `🎨 Excited to share my latest ${formData.category.toLowerCase()} creation: "${formData.productName}"! 

This piece represents hours of careful craftsmanship using traditional techniques passed down through generations. Each detail tells a story of cultural heritage and artistic passion.

${formData.description}

What do you think? I'd love to hear your thoughts! 

#TraditionalArt #Handmade #${formData.category} #ArtisanCraft`,
      
      blog: `# The Story Behind "${formData.productName}"

## Inspiration and Process

Creating this ${formData.category.toLowerCase()} piece was a journey that took me back to my roots in traditional craftsmanship. 

${formData.description}

## Traditional Techniques Used

The creation process involved several time-honored techniques:
- Hand-selected materials sourced locally
- Traditional tools passed down through generations  
- Careful attention to cultural authenticity
- Hours of patient, detailed work

## The Final Result

The finished piece represents not just an artwork, but a bridge between past and present, connecting modern art lovers with ancient traditions.

*What aspects of traditional art resonate most with you? Share your thoughts below!*`,
      
      video: `🎬 VIDEO SCRIPT: "Creating ${formData.productName}"

[INTRO - 0:00-0:15]
"Welcome back to my studio! Today I'm excited to show you the creation process of my latest ${formData.category.toLowerCase()} piece..."

[MATERIALS SHOWCASE - 0:15-0:45]  
"Let me first show you the traditional materials I'll be using. Each one has been carefully selected..."

[PROCESS DEMONSTRATION - 0:45-3:00]
"Now let's dive into the actual creation process. This technique has been used for centuries..."

[DETAILED WORK - 3:00-5:00]
"Here's where the magic happens. Notice how I'm using this traditional tool..."

[FINAL REVEAL - 5:00-5:30]
"And here's the finished piece! ${formData.description}"

[OUTRO - 5:30-6:00]
"Thanks for watching! Don't forget to like and subscribe for more traditional art content!"

📝 Video Notes:
- Close-up shots of hands working
- Time-lapse sequences for longer processes  
- Good lighting to show texture and detail
- Background music: Traditional/ambient`
    };
    
    setFormData({
      ...formData,
      content: templates[type as keyof typeof templates] || ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 mb-4">
              Share Your Art
            </h1>
            <p className="text-xl text-gray-600">
              Showcase your traditional crafts and connect with art lovers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl shadow-xl p-2 transform hover:scale-105 transition-all duration-300">
                <div className="flex space-x-1">
                  {[
                    { id: 'product', label: 'Product Info', icon: '🏺' },
                    { id: 'content', label: 'Create Content', icon: '✍️' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Information Tab */}
              {activeTab === 'product' && (
                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                        Product Name *
                      </label>
                      <input
                        name="productName"
                        type="text"
                        required
                        value={formData.productName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md"
                        placeholder="Enter your artwork name"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                        Category *
                      </label>
                      <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md resize-none"
                        placeholder="Describe your artwork, techniques used, inspiration..."
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                        Price ($)
                      </label>
                      <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md"
                        placeholder="Enter price (optional)"
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                        Product Images
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg ${
                          dragActive 
                            ? 'border-amber-500 bg-amber-50 scale-105' 
                            : 'border-gray-300 hover:border-amber-300 hover:bg-amber-50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-2">Drag and drop images here, or</p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileInput}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl duration-300"
                        >
                          Choose Files
                        </label>
                      </div>

                      {/* Image Preview */}
                      {formData.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                          {formData.images.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors transform hover:scale-110 duration-300"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('content')}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl duration-300"
                    >
                      Next: Create Content →
                    </button>
                  </form>
                </div>
              )}

              {/* Content Creation Tab */}
              {activeTab === 'content' && (
                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Content</h2>
                  
                  <div className="space-y-6">
                    {/* Content Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Choose Content Type
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { type: 'post', label: 'Social Post', icon: '📱', desc: 'Share on social media' },
                          { type: 'blog', label: 'Blog Article', icon: '📝', desc: 'Detailed story' },
                          { type: 'video', label: 'Video Script', icon: '🎥', desc: 'Video content' }
                        ].map((option) => (
                          <button
                            key={option.type}
                            onClick={() => setFormData({ ...formData, contentType: option.type })}
                            className={`p-4 rounded-lg border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                              formData.contentType === option.type
                                ? 'border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg'
                                : 'border-gray-300 hover:border-amber-300 hover:bg-amber-50'
                            }`}
                          >
                            <div className="text-2xl mb-2">{option.icon}</div>
                            <div className="font-semibold text-gray-800">{option.label}</div>
                            <div className="text-xs text-gray-600">{option.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AI Generate Button */}
                    <button
                      type="button"
                      onClick={() => generateContent(formData.contentType)}
                      disabled={!formData.productName || !formData.category}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      ✨ Generate AI Content
                    </button>

                    {/* Content Editor */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-amber-600 transition-colors">
                        Content
                      </label>
                      <textarea
                        name="content"
                        rows={12}
                        value={formData.content}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-amber-300 hover:shadow-md resize-none font-mono text-sm"
                        placeholder="Your generated content will appear here, or write your own..."
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('product')}
                        className="flex-1 border-2 border-amber-600 text-amber-700 py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-all transform hover:scale-105 duration-300"
                      >
                        ← Back to Product
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl duration-300"
                      >
                        Preview & Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              {showPreview ? (
                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Preview</h2>
                  
                  {/* Mock Post Display */}
                  <div className="border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">A</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Artisan Name</h3>
                        <p className="text-sm text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    
                    {formData.images.length > 0 && (
                      <img
                        src={URL.createObjectURL(formData.images[0])}
                        alt="Product preview"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{formData.productName}</h4>
                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">{formData.content}</p>
                    
                    {formData.price && (
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
                        ${formData.price}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                          </svg>
                          <span>Like</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                          </svg>
                          <span>Comment</span>
                        </button>
                      </div>
                      <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg duration-300">
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl duration-300">
                    🚀 Publish Post
                  </button>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Preview Your Post</h3>
                  <p className="text-gray-600">Complete the form and click "Preview & Post" to see how your artwork will appear to others.</p>
                </div>
              )}

              {/* Comment Section Preview */}
              {showPreview && (
                <CommentSection postId="preview" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreatePost;