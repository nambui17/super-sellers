import {
    QUERY_SINGLE_RECORD
} from './actions';

export default function reducer(state, action) {
    switch(action.type) {
        case QUERY_SINGLE_RECORD: {
            const record = {...action.payload}
        }
    }
}