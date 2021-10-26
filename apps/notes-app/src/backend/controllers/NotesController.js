import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all notes in the db.
 * send GET Request at /api/notes
 * */

export const getAllNotesHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      return new Response(200, {}, { notes: user.notes });
  };

/**
 * This handler handles creating a new note
 * send POST Request at /api/notes
 * body contains {note}
 * */

   export const createNoteHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
      if (!user) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const { note } = JSON.parse(request.requestBody);
      if(!note.tags){
        user.notes.push({ ...note, _id: uuid(), tags:[] });
      }else{
        user.notes.push({ ...note, _id: uuid()});
      }
      return new Response(201, {}, { notes: user.notes });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };

/**
 * This handler handles creating a new note
 * send DELETE Request at /api/notes/:noteId
 * */

 export const deleteNoteHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
      if (!user) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const noteId = request.params.noteId;
      const filteredNotes = user.notes.filter((item) => item._id !== noteId);
      user.notes = filteredNotes;
      return new Response(200, {}, { notes: user.notes });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
};

/**
 * This handler handles updating a note
 * send POST Request at /api/notes/:noteId
 * body contains {note}
 * */

 export const updateNoteHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
      if (!user) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const { note } = JSON.parse(request.requestBody);
      const { noteId } = JSON.parse(request.requestParams);
      const noteIndex = user.notes.findIndex(note => note._id === noteId);
      user.notes[noteIndex] = note;
      return new Response(201, {}, { note });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };

/**
 * This handler handles archiving a note
 * send POST Request at /api/notes/archive/:noteId
 * body contains {note}
 * */

 export const archiveNoteHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
      if (!user) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const { noteId } = JSON.parse(request.requestParams);
      const archivedNote = user.notes.filter(note => note._id === noteId)[0];
      user.archives.push({...archivedNote})
      return new Response(201, {}, { archives: user.archives, notes: user.notes });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };