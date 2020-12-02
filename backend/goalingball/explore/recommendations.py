from django.db import models
from django.utils import timezone
from users.models import User 
from goals.models import Goal
import numpy as np
from numpy.linalg import norm
import pickle
import base64

# def similarity(vec_a, vec_b):
#     return

def find_similar_goals(user_vector):
    # fist change the given vector into numpy
    np_bytes = base64.b64decode(user_vector)
    user_vector = pickle.loads(np_bytes)

    # find other users with highest cosine similarity
    user_dict = []
    for user in User.objects.all().values():
        np_bytes_other = base64.b64decode(user['vector'])
        user_vector_other = pickle.loads(np_bytes_other) # decode
        
        similarity = np.dot(user_vector, user_vector_other)/(norm(user_vector)*norm(user_vector_other)) # calculate cosine similarity
        user_dict.append({'id': user['id'], 'similarity':similarity}) # set a dictionary with key as user id and value as similarity

    # sort the dictionary by highest similarity
    user_dict = sorted(user_dict, key=(lambda u: u['similarity']))
    user_dict.reverse()

    # get goals from the users with highest similarity NOTE : the limit is set to 20 #
    goal_list = []
    for user in user_dict:
        for goal in Goal.objects.filter(user_id=user['id']):
            goal_list.append(goal)
            if len(goal_list) > 20:
                return goal_list
    return goal_list


