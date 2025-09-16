// App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';  // ✅ add this at the top
import './styles.css'; 
import React from "react";
import ListView from "./assets/Component/ListView";
const temp = {
  job: [
    {
      name: "Notification 1",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 3",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 4",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 5",
      notification_id: "Notification#1",
    }
  ],
  admitCard: [
    {
      name: "Notification 1",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 3",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 4",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 5",
      notification_id: "Notification#1",
    },
     {
      name: "Notification 1",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 3",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 4",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 5",
      notification_id: "Notification#1",
    }
  ],
  result: [
    {
      name: "Notification 1",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 3",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 4",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 5",
      notification_id: "Notification#1",
    }
  ],
  entrance: [
    {
      name: "Notification 1",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 3",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 4",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 5",
      notification_id: "Notification#1",
    }
  ],
  answer: [
    {
      name: "Notification 1",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 2",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 3",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 4",
      notification_id: "Notification#1",
    },
    {
      name: "Notification 5",
      notification_id: "Notification#1",
    }
  ]
}


const App: React.FC = () => {
  const handleItemClick = (item: { name: string; notification_id: string }) => {
    // alert(`Clicked on ${item.name}`);
    alert(`Clicked on ${item.name} and ${item.notification_id}`);
    
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {Object.entries(temp).map(([category, notifications]) => (
          <div key={category} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <ListView
                title={category}
                items={notifications}
                onItemClick={handleItemClick}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
