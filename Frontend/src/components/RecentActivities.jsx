function RecentActivities({ activities }) {
  return (
    <div className="mt-3">

      <div className="card shadow-sm border-0">

        <div className="card-header bg-white">
          <h5 className="mb-0 fw-bold">
            Recent Reviews of Customers
          </h5>
        </div>

        <div className="card-body py-2">

          {activities.map((activity, index) => (
            <p
              key={index}
              className="mb-1"
            >
              {index + 1}. {activity}
            </p>
          ))}

        </div>

      </div>

    </div>
  );
}

export default RecentActivities;