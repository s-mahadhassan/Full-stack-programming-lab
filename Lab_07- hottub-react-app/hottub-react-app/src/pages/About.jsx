import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const staffMembers = [
    {
      name: "Jennifer Lawrence",
      role: "Business Consultant",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
      description: "Jennifer provides customized showroom purchasing consulting to luxury private buyers."
    },
    {
      name: "Alex Mercer",
      role: "Hydrotherapy Consultant",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
      description: "Alex coordinates high pressure custom jet integrations for tailored medical client spa sheets."
    },
    {
      name: "Sophia Martinez",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200",
      description: "Sophia leads physical spa shell engineering and dynamic color gradient integrations."
    },
    {
      name: "Marcus Vance",
      role: "Technical Operations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
      description: "Marcus oversees global shipping, delivery, and post-installation electrical support."
    }
  ];

  return (
    <div className="w-100 p-5 bg-white border rounded text-start">
      {/* Breadcrumb */}
      <div className="small text-muted mb-4">
        <Link to="/" className="text-primary">Home</Link> &gt; About Us
      </div>
      
      <h3 className="fw-bold mb-4 text-dark">About Us</h3>
      
      {/* Welcome Section */}
      <div className="bg-light p-4 mb-5 border rounded">
        <h5 className="fw-bold mb-3 border-bottom pb-2 text-dark">Welcome to the Company</h5>
        
        <div className="row align-items-center">
          <div className="col-md-7">
            <p className="small text-muted" style={{ lineHeight: '1.7' }}>
              At Hotspring Portable Spas, we are passionate about helping people live healthier, happier lives through premium home hydrotherapy solutions. Established over two decades ago, we have earned a reputation for reliability, visual design elegance, and technical excellence. Our portable spas are engineered using the finest materials and feature revolutionary jet setups, built-in entertainment options, and highly efficient energy ratings.
            </p>
            <p className="small text-muted mb-0" style={{ lineHeight: '1.7' }}>
              We design with the modern user in mind, providing customizable shell aesthetics, premium cabinet finishes, and advanced wireless control panels. Whether you're seeking a compact spa for an intimate escape or a large tv-theater spa for family get-togethers, Hotspring delivers the perfect private sanctuary in your own backyard.
            </p>
          </div>
          <div className="col-md-5 mt-4 mt-md-0">
             <img 
               src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400&h=260" 
               alt="Corporate Hotspring Showroom" 
               className="img-fluid rounded border" 
             />
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <h5 className="fw-bold mb-3 border-bottom pb-2 text-dark">Our Company Members</h5>
      <p className="small text-muted mb-4">
        Our professional team comprises experienced designers, business experts, and service engineers dedicated to providing top-quality advice and customized post-purchase care.
      </p>
      
      <div className="row g-4 text-center">
        {staffMembers.map((staff, index) => (
          <div className="col-md-3 col-sm-6" key={index}>
            <div className="bg-light p-3 border rounded h-100 d-flex flex-column justify-content-between align-items-center">
              <img 
                src={staff.image} 
                alt={staff.name} 
                className="img-fluid rounded-circle mb-3 border"
                style={{ width: '130px', height: '130px', objectFit: 'cover' }}
              />
              <div>
                <h6 className="fw-bold mb-0 text-dark">{staff.name}</h6>
                <div className="small text-danger fw-bold mb-2" style={{ fontSize: '11px' }}>{staff.role}</div>
                <p className="text-muted mb-0" style={{ fontSize: '11px', lineHeight: 1.4 }}>
                  {staff.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
