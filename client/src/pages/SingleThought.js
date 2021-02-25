import React from 'react';
// allows use of url parameters
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHT } from '../utils/queries';
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  
  // get id from url parameter
  const { id: thoughtId } = useParams();
  console.log("ThoughtId:" , thoughtId);
  const {loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });

  // thought object
  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>

    
  );
};

export default SingleThought;
