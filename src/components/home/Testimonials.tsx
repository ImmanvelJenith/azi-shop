import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    { name: 'John Doe', feedback: 'Great products and fast shipping!' },
    { name: 'Jane Smith', feedback: 'Excellent customer service.' },
    { name: 'Peter Jones', feedback: 'I love the quality of the items.' },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 font-heading">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-6 shadow-md">
              <p className="text-charcoal-gray mb-4 font-body">"{testimonial.feedback}"</p>
              <p className="font-bold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
