import TeamMember from '../components/TeamMember';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Our Team</h2>
      
      <TeamMember
        name="Mani Kanta Podisetti"
        college="Velagapudi RamaKrishna Siddhartha Engineering College(SAHE University)"
        summary="Passionate about creating smart tools that simplify real-world problems like finance and learning. Believes in blending AI and web development to make tech intuitive and impactful."
      />
      
      <TeamMember
        name="Sagar Das"
        college="Aditya institute of technology and management (Aitam)"
        summary="Enthusiastic web developer dedicated to crafting clean, interactive websites. Always exploring new tools to enhance user experience and performance."
      />
    </div>
  );
};

export default About;