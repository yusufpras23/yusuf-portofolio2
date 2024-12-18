// pages/work.js
export default function Work() {
  return (
    <div className="min-h-screen bg-yellow-300 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Portfolio Website</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Here are some of the projects I’ve recently worked on. Each project showcases a combination of creativity, clean design, and functionality.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-2">My Projects</h2>
          <p className="text-gray-600 mb-4">
            A personal portfolio to showcase my skills, projects, and contact information.
          </p>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            View Project →
          </a>
        </div>

        {/* Project Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-2">E-commerce Shop</h2>
          <p className="text-gray-600 mb-4">
            An online store for computer equipment tailored to college students.
          </p>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            View Project → →
          </a>
        </div>

        {/* Project Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-2">Task Manager App</h2>
          <p className="text-gray-600 mb-4">
            A productivity app for managing daily tasks efficiently.
          </p>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            View Project →
          </a>
        </div>
      </div>
    </div>
  );
}
