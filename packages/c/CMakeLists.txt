#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousLib)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

#----------------------------------------------------------------------------------
# Library
#----------------------------------------------------------------------------------

add_library(vicious STATIC
    src/context.c
    src/memory.c

    src/generated/decoder.c
    src/generated/encoder.c
    src/generated/free.c
    src/generated/visitor.c
    src/generated/util.c
)

target_include_directories(vicious PUBLIC
    include
)
