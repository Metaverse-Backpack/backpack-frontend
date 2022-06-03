import { Canvas } from '@react-three/fiber';
import { FC, Suspense, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useStore } from '../store';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBackpackActions } from '../actions/backpackActions';
import { AvatarErrorBoundary } from './AvatarErrorBoundary';
import AvatarPreview from './AvatarPreview';

const BackpackItemGrid: FC = () => {
  const [store] = useStore();
  const { getBackpack } = useBackpackActions();

  useEffect(() => {
    getBackpack();
  }, []);

  return store.backpack ? (
    <Row>
      {store.backpack?.backpackItems.map((item) => (
        <Col xs={6} key={item.content} style={{ marginBottom: '20px' }}>
          <Card>
            <Card.Body>
              <AvatarErrorBoundary>
                <AvatarPreview avatarUri={'https://cloudflare-ipfs.com/ipfs/' + item.content} />
              </AvatarErrorBoundary>
              <Card.Title>{item.content}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.source}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <h1>No backpack found.</h1>
  );
};

export default BackpackItemGrid;
