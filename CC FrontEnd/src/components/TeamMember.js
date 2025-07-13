const TeamMember = ({ photo, name, qualification, college, summary }) => {
  return (
    <div className="team-member">
      <div className="member-info">
        <h3>{name}</h3>
        <p className="qualification">{qualification}</p>
        <p className="college">{college}</p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default TeamMember;