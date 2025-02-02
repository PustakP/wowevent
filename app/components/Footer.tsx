

export default function Footer(){
  return (
    <footer className="w-full py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <nav className="space-y-2">
              <a href="/" className="block text-gray-600 hover:text-blue-600">Home</a>
              <a href="/about" className="block text-gray-600 hover:text-blue-600">About</a>
              <a href="/services" className="block text-gray-600 hover:text-blue-600">Services</a>
              <a href="/contact" className="block text-gray-600 hover:text-blue-600">Contact us</a>
              <a href="/login" className="block text-gray-600 hover:text-blue-600">Log in</a>
            </nav>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <nav className="space-y-2">
              <a href="/bioinformatics" className="block text-gray-600 hover:text-blue-600">Bioinformatics</a>
              <a href="/omics" className="block text-gray-600 hover:text-blue-600">Omics aggregator</a>
              <a href="/spatial" className="block text-gray-600 hover:text-blue-600">Spatial.gs</a>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your work email"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Get started
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            Copyright © WEHIndia, 2025
          </p>
          
          {/* Social Media Links
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <YoutubeIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <GlobeIcon className="w-5 h-5" />
            </a> */}
          {/* </div> */}
        </div>
      </div>
    </footer>
  );
};

