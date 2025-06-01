import React from 'react'

export const impact = () => {
  return (
    <>
     {/* Platform Stats */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-text">Our Impact So Far</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-4xl font-bold text-blue-primary">5K+</h3>
              <p className="text-paragraph-text">Monthly Readers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-primary">500+</h3>
              <p className="text-paragraph-text">Published Blogs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-primary">300+</h3>
              <p className="text-paragraph-text">Active Writers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-primary">50+</h3>
              <p className="text-paragraph-text">Institutes Reached</p>
            </div>
          </div>
        </section>
    </>
  )
}
