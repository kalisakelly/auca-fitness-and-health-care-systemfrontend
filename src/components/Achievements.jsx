
const Achievements = () => {
  const achievements = [
    { icon: '⏱️', label: 'hours', value: 15 },
    { icon: '🔥', label: 'Kcal', value: 550 },
    { icon: '🧘‍♂️', label: 'Poses', value: 15 },
    { icon: '🏋️‍♀️', label: 'Sets', value: 5 },
    { icon: '🏃‍♂️', label: 'Sets', value: 5 },
  ];

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <div className="flex flex-wrap gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex flex-col items-center bg-blue-600 text-white p-4 rounded-lg shadow-lg">
            <span className="text-4xl mb-2">{achievement.icon}</span>
            <span className="text-xl font-bold">{achievement.value}</span>
            <span className="text-sm">{achievement.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
