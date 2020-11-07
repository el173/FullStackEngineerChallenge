import {
  EmployeeView,
  AdminReviewAssignView,
  MyReviewView,
} from '../../../components'

export const getRelevantViewComponent = (viewId) => {
  switch (viewId) {
    case 'emp':
      return <EmployeeView />;
    case 'rvw':
      return <AdminReviewAssignView />;
    case 'myrvw':
      return <MyReviewView />;
    default:
      return null;  
  }
};