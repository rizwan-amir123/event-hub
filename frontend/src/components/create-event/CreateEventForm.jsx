import './CreateEventForm.css';

const CreateEventForm = ({
    onSubmit,
    title,
    setTitle,
    description,
    setDescription,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    capacity,
    setCapacity,
    price,
    setPrice,
    error,
    loading
}) => {
    return (
        <form className="create-event-form" onSubmit={onSubmit}>
					<div className="form-group">
						  <label htmlFor="title" className="form-label">Title</label>
						  <input
						      type="text"
						      id="title"
						      value={title}
						      onChange={(e) => setTitle(e.target.value)}
						      className="form-input"
						      required
						      placeholder="Event Title"
						  />
					</div>
					
					<div className="form-group">
						  <label htmlFor="capacity" className="form-label">Capacity</label>
						  <input
						      type="number"
						      id="capacity"
						      value={capacity}
						      onChange={(e) => setCapacity(e.target.value)}
						      className="form-input"
						      required
						      placeholder="e.g., 100"
						  />
					</div>
					
					<div className="form-group">
						  <label htmlFor="startTime" className="form-label">Start Time</label>
						  <input
						      type="datetime-local"
						      id="startTime"
						      value={startTime}
						      onChange={(e) => setStartTime(e.target.value)}
						      className="form-input"
						      required
						  />
					</div>

					<div className="form-group">
						  <label htmlFor="endTime" className="form-label">End Time</label>
						  <input
						      type="datetime-local"
						      id="endTime"
						      value={endTime}
						      onChange={(e) => setEndTime(e.target.value)}
						      className="form-input"
						      required
						  />
					</div>

					<div className="form-group">
						  <label htmlFor="price" className="form-label">Price</label>
						  <input
						      type="number"
						      id="price"
						      value={price}
						      onChange={(e) => setPrice(e.target.value)}
						      className="form-input"
						      required
						      placeholder="e.g., 25.00"
						  />
					</div>

					<div className="form-group full-width">
						  <label htmlFor="description" className="form-label">Description</label>
						  <textarea
						      id="description"
						      value={description}
						      onChange={(e) => setDescription(e.target.value)}
						      className="form-textarea"
						      required
						      placeholder="Event Description"
						  />
					</div>

					{error && <div className="form-error">{error}</div>}
					
					<button type="submit" className="form-submit-button" disabled={loading}>
						  {loading ? 'Creating...' : 'Create Event'}
					</button>
			</form>

    );
};

export default CreateEventForm;
