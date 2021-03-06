import { FC, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useBackpackActions } from '../actions/backpackActions';
import { IBackpackItem, useStore } from '../store';

const BackpackItemList: FC = () => {
  const [store] = useStore();
  const navigate = useNavigate();
  const { getBackpack, deleteBackpackItem } = useBackpackActions();

  useEffect(() => {
    getBackpack();
  }, []);

  const onDelete = async (item: IBackpackItem) => {
    await deleteBackpackItem(item.id);
    getBackpack();
  };

  const onEdit = async (item: IBackpackItem) => {
    navigate('/item/' + item.id);
  };

  return store.backpack ? (
    <Table hover responsive>
      <thead>
        <tr>
          <th key={'content'}>Content</th>
          <th key={'category'}>Category</th>
          <th key={'source'}>Source</th>
          <th key={'actions'}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {store.backpack?.backpackItems.map((item) => (
          <tr key={item.content}>
            <td>{item.content}</td>
            <td>{item.category}</td>
            <td>{item.source}</td>
            <td>
              <Button size="sm" variant="secondary" onClick={() => onEdit(item)}>
                Edit
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(item)}>
                Del
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <h1>No backpack found.</h1>
  );
};

export default BackpackItemList;
